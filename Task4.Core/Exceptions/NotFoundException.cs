using System;

namespace Task4.Core.Exceptions
{
    public class NotFoundException : RepositoryReadException
    {
        public NotFoundException(string message = "Item not found") : base(message)
        {
        }

        public NotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
