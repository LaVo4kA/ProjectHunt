using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectHunt.Api.BusinessLogic.Repositories
{
    public class DbQueryException : Exception
    {
        public DbQueryException(string message)
            : base(message)
        {
        }
    }
}
