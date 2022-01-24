using System;

namespace Task4.Core.Exceptions
{
    public class RepositoryWriteException : RepositoryException
    {
        public RepositoryWriteException(string message = "Repository write exception") : base(message)
        {
        }

        public RepositoryWriteException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
