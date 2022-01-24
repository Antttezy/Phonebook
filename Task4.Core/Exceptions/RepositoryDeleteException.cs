using System;

namespace Task4.Core.Exceptions
{
    public class RepositoryDeleteException : RepositoryWriteException
    {
        public RepositoryDeleteException(string message = "Repository delete exception") : base(message)
        {
        }

        public RepositoryDeleteException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
