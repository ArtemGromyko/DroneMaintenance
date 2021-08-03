﻿using DroneMaintenance.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace DroneMaintenance.DAL.Configuration
{
    class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasAlternateKey(u => u.Email);
            builder.HasAlternateKey(u => u.Password);

            builder.HasData
            (
                new User 
                {
                    Id = new Guid("85d2dad8-5ad5-4ad7-ab42-2a883cf0846a"),
                    Name = "Sam",
                    Email = "sam@email.com",
                    Password = "admin",
                    RoleId = new Guid("865ce3fc-de0d-4372-901d-05e0ba2b8d02")
                },
                new User
                {
                    Id = new Guid("bf62c2cd-aa17-47ea-b575-f8d769966fb9"),
                    Name = "Donald",
                    Email = "donald@email.com",
                    Password = "user",
                    RoleId = new Guid("f6736344-8a7e-43f4-9a1a-facf460b5f3f")
                }
            );
        }
    }
}
