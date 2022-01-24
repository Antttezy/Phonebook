using System;

namespace Task4.Core.Exceptions
{
    public class RepositoryReadException : RepositoryException
    {
        public RepositoryReadException(string message = "Repository read exception") : base(message)
        {
        }

        public RepositoryReadException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
