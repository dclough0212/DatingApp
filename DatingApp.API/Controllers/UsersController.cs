using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _userRepo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [HttpGet("/api/users/{id:int}")]
        public async Task<IActionResult> GetUser(int id){
            var user = await _userRepo.GetUser(id);
            var newUser = _mapper.Map<UserForDetailedDto>(user);

            return Ok(newUser);
        }

        [HttpGet("/api/users/")]
        public async Task<IActionResult> GetUsers(){
            var users = await _userRepo.GetUsers();
            var userList = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(userList);
        }

    }
}