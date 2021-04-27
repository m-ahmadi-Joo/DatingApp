using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Dtos
{
    public class PhotoForCreationDto
    {
        public PhotoForCreationDto(string url, IFormFile file, string publicId, string description, DateTime dateAdded)
        {
            this.Url = url;
            this.File = file;
            this.PublicId = publicId;
            this.Description = description;
            this.DateAdded = dateAdded;

        }
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string PublicId { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public PhotoForCreationDto()
        {
            DateAdded = DateTime.Now;
        }

    }
}