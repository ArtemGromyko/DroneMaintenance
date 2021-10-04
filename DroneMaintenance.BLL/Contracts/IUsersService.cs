using DroneMaintenance.DAL.Entities;
using DroneMaintenance.Models.RequestModels.ServiceRequest;
using DroneMaintenance.Models.RequestModels.User;
using DroneMaintenance.Models.ResponseModels.ServiceRequest;
using DroneMaintenance.Models.ResponseModels.User;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DroneMaintenance.BLL.Contracts
{
    public interface IUsersService
    {
        Task<UserModel> AuthenticateAsync(AuthenticationModel authenticationModel);
        Task<List<UserModel>> GetUsersAsync();
        Task<UserModel> GetUserAsync(Guid id);
        Task<UserModel> RegisterAsync(RegistrationModel registrationModel);
        Task UpdateToken(Guid id, string token = null);
        Task<ServiceRequest> TryGetServiceRequestEntityForUserAsync(Guid userId, Guid id);
        Task<ServiceRequestModel> GetServiceRequestForUserAsync(Guid userId, Guid id);
        Task<List<ServiceRequestModel>> GetServiceRequestsForUserAsync(Guid userId);
        Task<ServiceRequestModel> CreateServiceRequestForUserAsync(Guid userId, ServiceRequestForCreationModel requestForCreationModel);
        Task<ServiceRequestModel> UpdateServiceRequestForUserAsync(Guid userId, Guid id, 
        ServiceRequestForUpdateModel requestForUpdateModel);
        Task DeleteServiceRequestForUserAsync(Guid userId, Guid id);
    }
}
