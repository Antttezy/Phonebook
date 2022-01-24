using System;

namespace Task4.Core.Exceptions
{
    public class RepositoryAddException : RepositoryWriteException
    {
        public RepositoryAddException(string message = "Can not add this to the database") : base(message)
        {
        }

        public RepositoryAddException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
