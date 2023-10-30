using AutoMapper;
using HealthHarmony.Auth.Interfaces;
using HealthHarmony.Common.Models.Pagination;
using HealthHarmony.Doctors.Interfaces;
using HealthHarmony.Models.Clinics.Entities;
using HealthHarmony.Models.Doctors.Dto;
using HealthHarmony.Models.Doctors.Entities;
using HealthHarmony.Models.Doctors.Filters;
using HealthHarmony.SQL;
using HealthHarmony.SQLRepository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HealthHarmony.Doctors.Services
{
    public class DoctrosService : IDoctorsService
    {
        private readonly IRepository _repository;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        public DoctrosService(IRepository repository, IMapper mapper, IAuthService authService) 
        {
            _repository = repository;
            _mapper = mapper;
            _authService = authService;
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
            await _repository.Delete<Doctor>(Id);
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
            
            doctor.FirstName = doctorDto.FirstName;
            doctor.LastName = doctorDto.LastName;
            doctor.Email = doctorDto.Email;
            doctor.AcceptsRemotely = doctorDto.AcceptsRemotely;
            doctor.Image = doctorDto.Image;
            await _repository.Update(doctor);
        }

        private async Task AssignClinicsToDoctor(Doctor doctor, List<Guid> clinicsIds)
        {
            var doctorClinics = await _repository.GetAll<Clinic>().Where(x => clinicsIds.Contains(x.Id)).ToListAsync();
            doctor.Clinics = doctorClinics;
        }

        private async Task AssignUserToDoctor(Doctor doctor)
        {
            var user = await _authService.CreateUserForDoctor(doctor);
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
            /*// Specialization
            var specializationsList = new List<Specialization>();
            //New specializations to create
            var newSpecializationsDto = doctorDto.Specializations.Where(x => x.Id == null).ToList();
            //Check if there is no such specialization in db
            foreach (var specializationDto in newSpecializationsDto)
            {
                var specialization = await _repository.Get<Specialization>(x => x.Name == specializationDto.Name);
                if (specialization == null)
                    continue;
                doctor.Specializations.Add(specialization);
                newSpecializationsDto.Remove(specializationDto);
            }
            var newSpecializations = _mapper.Map<List<Specialization>>(newSpecializationsDto);
            specializationsList.AddRange(newSpecializations);
            //upToDate ids
            var upToDateSpecializationsIds = doctorDto.Specializations.Where(x => x.Id != null).Select(x => x.Id).ToList();
            var oldDoctorSpecializationsIds = doctor.Specializations.Select(x => x.Id).ToList();
            var specializationsToRemoveIds = new List<Guid>();
            foreach (var oldSpecialization in oldDoctorSpecializationsIds)
            {
                if (!upToDateSpecializationsIds.Contains(oldSpecialization))
                {
                    specializationsToRemoveIds.Add(oldSpecialization);
                }
            }
            var specializationsToRemove = await _repository.GetAll<Specialization>(x => x.Doctors).Where(x => specializationsToRemoveIds.Contains(x.Id)).ToListAsync();
            foreach (var specializationToRemove in specializationsToRemove)
            {
                doctor.Specializations.Remove(specializationToRemove);
            }

            //Assign specializations already exising in database
            var newDoctorSpecializationsExistingInDb = doctorDto.Specializations.Where(x => x.Id != null && !oldDoctorSpecializationsIds.Contains((Guid)x.Id)).Select(x => x.Id).ToList();
            var specializationsFromDb = await _repository.GetAll<Specialization>(x => x.Doctors).Where(x => newDoctorSpecializationsExistingInDb.Contains(x.Id)).ToListAsync();
            specializationsList.AddRange(specializationsFromDb);
            doctor.Specializations = specializationsList;*/
        }

    }
}
