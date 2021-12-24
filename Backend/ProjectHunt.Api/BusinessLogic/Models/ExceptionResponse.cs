using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class ExceptionResponse
    {
        public string ErrorMessage { get; }
        public int StatusCode { get; }

        public ExceptionResponse(int statusCode, string errorMessage)
        {
            ErrorMessage = errorMessage;
            StatusCode = statusCode;
        }
    }
}
