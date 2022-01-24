using System;

namespace Task4.Core.Exceptions
{
    public class RepositoryUpdateException : RepositoryWriteException
    {
        public RepositoryUpdateException(string message = "Can not update entry") : base(message)
        {
        }

        public RepositoryUpdateException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
