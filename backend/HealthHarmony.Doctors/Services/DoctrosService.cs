using AutoMapper;
using HealthHarmony.Common.Constants;
using HealthHarmony.Doctors.Interfaces;
using HealthHarmony.Models.Auth.Entities;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Common.Pagination;
using HealthHarmony.Models.Doctors.Dto;
using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Doctors.Filters;
using HealthHarmony.SQLRepository.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PasswordGenerator;

namespace HealthHarmony.Doctors.Services
{
    public class DoctrosService : IDoctorsService
    {
        private readonly IRepository _repository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public DoctrosService(IRepository repository, IMapper mapper, UserManager<User> userManager) 
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
        }
        public async Task Add(DoctorDto doctorDto)
        {
            var doctor = _mapper.Map<Doctor>(doctorDto);

            await AssignClinicsToDoctor(doctor, doctorDto.ClinicsIds);
            await AssignUserToDoctor(doctor);
            await AssignSpecializationsToDoctor(doctor, doctorDto);
            
            await _repository.Add(doctor);
        }

        public async Task Delete(Guid Id)
        {
            //We have to just delete doctor's user - cascade delete will do rest for us
            var doctor = await _repository.Get<Doctor>(Id, x => x.User);
            var user = doctor.User;
            await _userManager.DeleteAsync(user);
        }

        public async Task<List<Doctor>> GetAll()
        {
            return await _repository.GetAll<Doctor>(x => x.Clinics, x => x.Image, x => x.User, x => x.Specializations).ToListAsync();
        }

        public async Task<List<Doctor>> GetAllWithoutIncludes()
        {
            return await _repository.GetAll<Doctor>().ToListAsync();
        }

        public async Task<Doctor> GetById(Guid Id)
        {
            return await _repository.Get<Doctor>(Id, x => x.Clinics, x => x.Image, x => x.User, x => x.Specializations);
        }

        public async Task<Doctor> GetByIdWithoutIncludes(Guid Id)
        {
            return await _repository.Get<Doctor>(Id);
        }

        public PagedList<Doctor> GetPagedList(DoctorsFilters filters)
        {
            return _repository.GetPagedList<Doctor>(filters, x => x.Clinics, x => x.Image, x => x.User, x => x.Specializations);
        }

        public PagedList<Doctor> GetPagedListWithoutIncludes(DoctorsFilters filters)
        {
            return _repository.GetPagedList<Doctor>(filters);
        }

        public async Task Update(DoctorDto doctorDto)
        {

            var doctor = _repository.GetAll<Doctor>(x => x.Specializations, x => x.User, x => x.Clinics).Single(x => x.Id == doctorDto.Id);
            await UpdateDoctrosClinics(doctor, doctorDto.ClinicsIds);
            await UpdateDoctorsSpecializations(doctor, doctorDto);
            if(doctor.Email != doctorDto.Email)
            {
                var mappedDoctorDto = _mapper.Map<Doctor>(doctorDto);
                await AssignUserToDoctor(mappedDoctorDto);
                var user = await _userManager.Users.SingleAsync(x => x.Email == doctorDto.Email);
                await _userManager.DeleteAsync(user);
            }
            
            doctor.FirstName = doctorDto.FirstName;
            doctor.LastName = doctorDto.LastName;
            doctor.Email = doctorDto.Email;
            doctor.AcceptsRemotely = doctorDto.AcceptsRemotely;
            doctor.Image = doctorDto.Image;
            await _repository.Update(doctor);
        }

        public async Task<List<Specialization>> GetAllSpecializations()
        {
            var result = await _repository.GetAll<Specialization>().ToListAsync();
            return result;
        }

        private async Task AssignClinicsToDoctor(Doctor doctor, List<Guid> clinicsIds)
        {
            var doctorClinics = await _repository.GetAll<Clinic>().Where(x => clinicsIds.Contains(x.Id)).ToListAsync();
            doctor.Clinics = doctorClinics;
        }

        private async Task AssignUserToDoctor(Doctor doctor)
        {
            var user = await CreateUserForDoctor(doctor);
            doctor.User = user;
            doctor.UserId = user.Id;
        }

        private async Task AssignSpecializationsToDoctor(Doctor doctor, DoctorDto doctorDto)
        {
            var specializations = new List<Specialization>();

            var existingSpecializationsIds = doctorDto.Specializations.Where(x => x.Id != null).Select(x => x.Id).ToList() ?? new List<Guid?>();
            var newSpecializationsDto = doctorDto.Specializations.Where(x => x.Id == null).ToList();
            var newSpecializationsNames = newSpecializationsDto.Select(x => x.Name).ToList();

            var existingSpecializations = await _repository.GetAll<Specialization>().Where(x => existingSpecializationsIds.Contains(x.Id)).ToListAsync();
            specializations.AddRange(existingSpecializations);

            var specializationsWithSameName = await _repository.GetAll<Specialization>().Where(x => newSpecializationsNames.Contains(x.Name)).ToListAsync();
            specializations.AddRange(specializationsWithSameName);

            newSpecializationsDto.RemoveAll(dto => specializationsWithSameName.Any(spec => spec.Name == dto.Name));
            var newSpecializations = _mapper.Map<List<Specialization>>(newSpecializationsDto);
            specializations.AddRange(newSpecializations);

            doctor.Specializations = specializations;
        }

        private async Task UpdateDoctrosClinics(Doctor doctor, List<Guid> clinicsIds)
        {
            var oldDoctorClinicsIds = doctor.Clinics.Select(x => x.Id).ToList();
            var oldClinics = await _repository.GetAll<Clinic>().Where(x => oldDoctorClinicsIds.Contains(x.Id)).ToListAsync();
            foreach (var clinic in oldClinics)
            {
                if (doctor.Clinics == null)
                    break;
                doctor.Clinics.Remove(clinic);
            }
            await AssignClinicsToDoctor(doctor, clinicsIds);
        }

        private async Task UpdateDoctorsSpecializations(Doctor doctor, DoctorDto doctorDto)
        {
            var oldDoctorSpecializationsIds = doctor.Specializations.Select(x => x.Id).ToList();
            var oldSpecializations = await _repository.GetAll<Specialization>().Where(x => oldDoctorSpecializationsIds.Contains(x.Id)).ToListAsync();
            foreach(var specialization in oldSpecializations)
            {
                if (doctor.Specializations == null)
                    break;
                doctor.Specializations.Remove(specialization);
            }
            await AssignSpecializationsToDoctor(doctor, doctorDto);
        }

        private async Task<User> CreateUserForDoctor(Doctor doctor)
        {
            Password passwordGenerator = new Password();
            var password = passwordGenerator.Next();
            //Remove line below on production/when sending password in email will be implemented
            password = "Qw12qw12!";
            User user = new User
            {
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Email = doctor.Email.Split('@')[0],
                UserName = doctor.Email
            };
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, Roles.Doctor);
                return user;
            }
            else
            {
                throw new Exception("There was a problem while creating user for doctor");
            }
        }

        public async Task<List<Clinic>> GetDoctorClinics(string userId)
        {
            var doctor = await _repository.GetAll<Doctor>(x => x.Clinics).FirstOrDefaultAsync(x => x.UserId == userId);
            return doctor.Clinics.ToList();
        }
    }
}
