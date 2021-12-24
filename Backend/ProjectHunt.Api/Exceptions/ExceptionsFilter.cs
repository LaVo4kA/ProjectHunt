using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ProjectHunt.Api.BusinessLogic.Models;

namespace ProjectHunt.Api.Exceptions
{
    public class ExceptionsFilter : IActionFilter, IOrderedFilter
    {
        public int Order => int.MaxValue - 10;

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception is ProjectHuntApiException exception)
            {
                context.Result = new ObjectResult(new ExceptionResponse(exception.HttpCode, exception.ErrorMessage)) { StatusCode = exception.HttpCode };
                context.ExceptionHandled = true;
            }
        }

        public void OnActionExecuting(ActionExecutingContext context) { }
    }
}
