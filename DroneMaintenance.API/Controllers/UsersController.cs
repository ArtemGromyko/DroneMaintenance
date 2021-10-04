using DroneMaintenance.API.Filters.ActionFilters;
using DroneMaintenance.BLL.Contracts;
using DroneMaintenance.Models.RequestModels.Comment;
using DroneMaintenance.Models.RequestModels.ServiceRequest;
using DroneMaintenance.Models.RequestModels.User;
using DroneMaintenance.Models.ResponseModels.Comment;
using DroneMaintenance.Models.ResponseModels.ServiceRequest;
using DroneMaintenance.Models.ResponseModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DroneMaintenance.API.Controllers
{
    [Route("api/users")]
    [Authorize]
    [ServiceFilter(typeof(TokenValidationFilterAttribute))]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly ICommentsForUserService _commentsForUserService;

        public UsersController(IUsersService usersService, ICommentsForUserService commentsForUserService)
        {
            _usersService = usersService;
            _commentsForUserService = commentsForUserService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<UserModel>> AuthenticateAsync([FromBody] AuthenticationModel model)
        {
            var userModel = await _usersService.AuthenticateAsync(model);
            if (userModel == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            return userModel;
        }

        [AllowAnonymous]
        [Route("registration")]
        [HttpPost]
        public async Task<ActionResult<UserModel>> RegisterAsync([FromBody] RegistrationModel model)
        {
            var userModel = await _usersService.RegisterAsync(model);
            if (userModel == null)
            {
                return BadRequest(new { message = $"User with email: {model.Email} already exists" });
            }

            return userModel;
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsersAsync()
        {
            var userModels = await _usersService.GetUsersAsync();

            return userModels;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserAsync(Guid id)
        {
            var userModel = await _usersService.GetUserAsync(id);

            return userModel;
        }

        [HttpPost("signout/{id}")]
        public async Task<ActionResult<UserModel>> SignOut(Guid id)
        {
            await _usersService.UpdateToken(id);

            return Ok();
        }

        [HttpGet("{userId}/requests/{id}")]
        public async Task<ActionResult<ServiceRequestModel>> GetServiceRequestForUserAsync(Guid userId, Guid id) =>
            await _usersService.GetServiceRequestForUserAsync(userId, id);

        [HttpGet("{userId}/requests")]
        public async Task<ActionResult<IEnumerable<ServiceRequestModel>>> GetServiceRequestsForUserAsync(Guid userId) =>
            await _usersService.GetServiceRequestsForUserAsync(userId);

        [HttpPost("{userId}/requests")]
        public async Task<ActionResult<ServiceRequestModel>> CreateServiceRequestForUserAsync(Guid userId,
        [FromBody] ServiceRequestForCreationModel request) =>
            await _usersService.CreateServiceRequestForUserAsync(userId, request);

        [HttpPut("{userId}/requests/{id}")]
        public async Task<ActionResult<ServiceRequestModel>> UpdateServiceRequestAsync(Guid userId, Guid id,
        [FromBody] ServiceRequestForUpdateModel request) =>
            await _usersService.UpdateServiceRequestForUserAsync(userId, id, request);

        [HttpDelete("{userId}/requests/{id}")]
        public async Task<ActionResult<ServiceRequestModel>> DeleteServiceRequestModel(Guid userId, Guid id)
        {
            await _usersService.DeleteServiceRequestForUserAsync(userId, id);

            return NoContent();
        }

        [HttpGet("{userId}/comments")]
        public async Task<ActionResult<IEnumerable<CommentModel>>> GetCommentsForUserAsync(Guid userId) =>
            await _commentsForUserService.GetCommentsForUserAsync(userId);

        [HttpGet("{userId}/comments/{id}")]
        public async Task<ActionResult<CommentModel>> GetCommentForUserAsync(Guid userId, Guid id) =>
            await _commentsForUserService.GetCommentForUserAsync(userId, id);

        [HttpPost("{userId}/comments")]
        public async Task<ActionResult<CommentModel>> CreateCommentForUserAsyn(Guid userId, [FromBody] CommentForCreationModel comment) =>
            await _commentsForUserService.CreateCommentForUserAsync(userId, comment);

        [HttpPut("{userId}/comments/{id}")]
        public async Task<ActionResult<CommentModel>> UpdateCommentForUserAsync(Guid userId, Guid id, [FromBody] CommentForUpdateModel comment) =>
            await _commentsForUserService.UpdateCommentForUserAsync(userId, id, comment);

        [HttpDelete("{userId}/comments/{id}")]
        public async Task<ActionResult> DeleteCommentForUserAsync(Guid userId, Guid id)
        {
            await _commentsForUserService.DeleteCommentForUserAsyn(userId, id);

            return NoContent();
        }
    }
}
