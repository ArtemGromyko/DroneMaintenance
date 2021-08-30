﻿using DroneMaintenance.API.Filters.ActionFilters;
using DroneMaintenance.BLL.Contracts;
using DroneMaintenance.Models.RequestModels.User;
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

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
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
            await _usersService.UpdateToken(id, null);

            return Ok();
        }
    }
}
