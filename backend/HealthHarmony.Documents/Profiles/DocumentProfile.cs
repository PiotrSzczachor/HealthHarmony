using AutoMapper;
using HealthHarmony.Models.Documents.Dto;
using HealthHarmony.Models.Documents.Entities;

namespace HealthHarmony.Documents.Profiles
{
    public class DocumentProfile : Profile
    {
        public DocumentProfile() 
        {
            CreateMap<Document, DocumentDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
            CreateMap<DocumentDto, Document>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id ?? Guid.Empty));
        }
    }
}
