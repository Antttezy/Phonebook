using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task4.Core.Models;
using Task4.Core.Requests;
using Task4.Core.Services;

namespace Task4.Controllers
{
    [ApiController]
    public class PhonebooksController : Controller
    {
        private readonly IPhonebookEntryService phonebookEntryService;

        public PhonebooksController(IPhonebookEntryService phonebookEntryService)
        {
            this.phonebookEntryService = phonebookEntryService;
        }

        [HttpGet("/contacts")]
        public async Task<List<PhonebookEntry>> GetPhonebookEntriesAsync()
        {
            var result = await phonebookEntryService.GetAllAsync();
            return result.ToList();
        }

        [HttpPost("/contacts/add")]
        public async Task<PhonebookEntry> AddPhonebookEntryAsync([FromBody] AddPhonebookEntryRequest request)
        {
            PhonebookEntry phonebookEntry = new()
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Mail = request.Mail,
                GroupId = request.GroupId
            };

            await phonebookEntryService.Add(phonebookEntry);
            return await phonebookEntryService.GetById(phonebookEntry.Id);
        }

        [HttpPut("/contacts/{id:int}")]
        public async Task<PhonebookEntry> UpdatePhonebookEntryAsync([FromRoute] int id, [FromBody] AddPhonebookEntryRequest request)
        {
            PhonebookEntry entry = await phonebookEntryService.GetById(id);

            entry.Name = request.Name;
            entry.PhoneNumber = request.PhoneNumber;
            entry.Mail = request.Mail;
            entry.GroupId = request.GroupId;

            return await phonebookEntryService.Update(entry);
        }

        [HttpDelete("/contacts/{id:int}")]
        public async Task RemovePhonebookEntryAsync([FromRoute] int id)
        {
            await phonebookEntryService.Remove(id);
        }
    }
}
