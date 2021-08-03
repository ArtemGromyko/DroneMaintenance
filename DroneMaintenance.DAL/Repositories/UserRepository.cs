﻿using DroneMaintenance.DAL.Contracts;
using DroneMaintenance.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DroneMaintenance.DAL.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepositoryContext repositoryContext) : base(repositoryContext) { }
        public async Task<List<User>> GetAllUsersAsync() =>
           await FindAll().ToListAsync();

        public async Task<User> GetUserByIdAsync(Guid id) =>
            await FindByCondition(u => u.Id.Equals(id)).SingleOrDefaultAsync();

        public async Task UpdateUserAsync(User user) =>
            await UpdateAsync(user);

        public async Task CreateUserAsync(User user) =>
            await CreateAsync(user);

        public async Task DeleteUserAsync(User user) =>
            await DeleteAsync(user);
    }
}
