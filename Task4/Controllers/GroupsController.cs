using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task4.Core.Models;
using Task4.Core.Objects;
using Task4.Core.Requests;
using Task4.Core.Services;

namespace Task4.Controllers
{
    [ApiController]
    public class GroupsController : Controller
    {
        private readonly IGroupService groupService;

        public GroupsController(IGroupService groupService)
        {
            this.groupService = groupService;
        }

        [HttpGet("/groups")]
        public async Task<List<ContactGroupDAO>> GetContactGroupsAsync()
        {
            var groups = await groupService.GetAllAsync();

            return groups.Select(g => new ContactGroupDAO
            {
                Id = g.Id,
                Name = g.Name
            }).ToList();
        }

        [HttpPost("/groups/add")]
        public async Task<ContactGroupDAO> AddContactGroupAsync([FromBody] AddGroupRequest request)
        {
            ContactGroup group = new()
            {
                Name = request.Name
            };

            ContactGroup result = await groupService.Add(group);

            return new()
            {
                Id = result.Id,
                Name = result.Name
            };
        }

        [HttpGet("/groups/{id:int}")]
        public async Task<ContactGroup> GetContactGroupAsync([FromRoute] int id)
        {
            return await groupService.GetByIdAsync(id);
        }

        [HttpPut("/groups/{id:int}")]
        public async Task<ContactGroup> UpdateContactGroupAsync([FromRoute] int id, [FromBody] AddGroupRequest request)
        {
            ContactGroup group = await groupService.GetByIdAsync(id);

            group.Name = request.Name;
            return await groupService.Update(group);
        }


        [HttpDelete("/groups/{id:int}")]
        public async Task RemoveContactGroupAsync([FromRoute] int id)
        {
            await groupService.Remove(id);
        }
    }
}
