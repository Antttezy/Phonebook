using System;

namespace Task4.Core.Exceptions
{
    public abstract class RepositoryException : ApplicationException
    {
        protected RepositoryException(string message = "Repository exception") : base(message)
        {
        }

        protected RepositoryException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
