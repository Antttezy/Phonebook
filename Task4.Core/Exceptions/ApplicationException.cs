using System;

namespace Task4.Core.Exceptions
{
    public abstract class ApplicationException : Exception
    {
        public ApplicationException(string message = "Unknown application exception") : base(message)
        {
        }

        public ApplicationException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
