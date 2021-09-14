﻿using AutoMapper;
using DroneMaintenance.DAL.Entities;
using DroneMaintenance.DTO;
using DroneMaintenance.Models.RequestModels.Comment;
using DroneMaintenance.Models.RequestModels.Contract;
using DroneMaintenance.Models.RequestModels.ContractSparePart;
using DroneMaintenance.Models.RequestModels.Drone;
using DroneMaintenance.Models.RequestModels.ServiceRequest;
using DroneMaintenance.Models.RequestModels.SparePart;
using DroneMaintenance.Models.RequestModels.User;
using DroneMaintenance.Models.ResponseModels.Comment;
using DroneMaintenance.Models.ResponseModels.Contract;
using DroneMaintenance.Models.ResponseModels.ContractSparePart;
using DroneMaintenance.Models.ResponseModels.Drone;
using DroneMaintenance.Models.ResponseModels.ServiceRequest;
using DroneMaintenance.Models.ResponseModels.SparePart;
using DroneMaintenance.Models.ResponseModels.User;

namespace DroneMaintenance.BLL.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMapsForServiceRequest();
            CreateMapsForDrone();
            CreateMapsForContract();
            CreateMapsForSparePart();
            CreateMapsForContractSparePart();
            CreateMapsForUser();
            CreateMapsForComments();
        }

        private void CreateMapsForComments()
        {
            CreateMap<Comment, CommentModel>()
                .ForMember(cm => cm.UserName, x => x.MapFrom(c => c.User.Name))
                .ForMember(cm => cm.UserRole, x => x.MapFrom(c => c.User.Role.Name));
            CreateMap<CommentForCreationModel, Comment>();
            CreateMap<CommentForUpdateModel, Comment>();
        }

        private void CreateMapsForUser()
        {
            CreateMap<User, UserModel>()
                .ForMember(u => u.Role, um => um.MapFrom(um => um.Role.Name));
            CreateMap<RegistrationModel, User>();
            CreateMap<RegistrationModel, AuthenticationModel>();
        }

        private void CreateMapsForContractSparePart()
        {
            CreateMap<ContractSparePart, ContractSparePartModel>()
                .ForMember(cspm => cspm.SparePartName, x => x.MapFrom(csp => csp.SparePart.Name));
            CreateMap<ContractSparePartForCreationModel, ContractSparePart>();
            CreateMap<ContractSparePartForUpdateModel, ContractSparePart>();
            CreateMap<SparePart, SparePartDto>().ReverseMap();
        }

        private void CreateMapsForContract()
        {
            CreateMap<Contract, ContractModel>();
            CreateMap<ContractForUpdateModel, Contract>();
            CreateMap<ContractForCreationModel, Contract>();
        }

        private void CreateMapsForSparePart()
        {
            CreateMap<SparePart, SparePartModel>();
            CreateMap<SparePartForUpdateModel, SparePart>();
            CreateMap<SparePartForCreationModel, SparePart>();
        }

        private void CreateMapsForServiceRequest()
        {
            CreateMap<ServiceRequest, ServiceRequestModel>()
                .ForMember(srm => srm.RequestStatus, opts => opts.MapFrom(x => GetStatuses(x.RequestStatus)))
                .ForMember(srm => srm.ServiceType, opts => opts.MapFrom(x => GetServiceTypes(x.ServiceType)));
            CreateMap<ServiceRequestForCreationModel, ServiceRequest>();
            CreateMap<ServiceRequestForUpdateModel, ServiceRequest>().ReverseMap();
        }

        private void CreateMapsForDrone()
        {
            CreateMap<Drone, DroneModel>();
            CreateMap<DroneForCreationModel, Drone>();
            CreateMap<DroneForUpdateModel, Drone>().ReverseMap();
        }

        private string GetStatuses(RequestStatus request)
        {
            switch(request)
            {
                case RequestStatus.Recived:
                    return "Request received";
                case RequestStatus.WorkInProgress:
                    return "Work in progress";
                case RequestStatus.WorkFinished:
                    return "Work finished";
                case RequestStatus.SparePartsOnTheWay:
                    return "Spare parts on the way";
                default:
                    return "Wrong status";
            }
        }

        private string GetServiceTypes(ServiceType serviceType)
        {
            switch(serviceType)
            {
                case ServiceType.Diagnostics:
                    return "Diagnostics";
                case ServiceType.RepairWithoutReplacement:
                    return "Repair without replacement";
                case ServiceType.RepairWithReplacement:
                    return "Repair with replacement";
                default:
                    return "Wrong type";
            }
        }
    }
}
