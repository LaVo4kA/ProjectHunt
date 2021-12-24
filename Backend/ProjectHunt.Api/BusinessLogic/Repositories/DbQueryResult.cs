namespace ProjectHunt.Api.BusinessLogic.Repositories
{
    public enum DbQueryResultStatus
    {
        Ok,
        Error,
        NotFound,
        Conflict,
        ConstraintViolation
    }

    public class DbQueryResult
    {
        private DbQueryResult(DbQueryResultStatus status, string errorMessage = null)
        {
            this.Status = status;
            this.ErrorMessage = errorMessage;
        }

        public string ErrorMessage { get; }

        public DbQueryResultStatus Status { get; }

        public static DbQueryResult Ok()
        {
            return new DbQueryResult(DbQueryResultStatus.Ok);
        }

        public static DbQueryResult NotFound(string errorMessage)
        {
            return new DbQueryResult(DbQueryResultStatus.NotFound, errorMessage);
        }

        public static DbQueryResult ConstraintViolation(string errorMessage)
        {
            return new DbQueryResult(DbQueryResultStatus.ConstraintViolation, errorMessage);
        }

        public static DbQueryResult Conflict(string errorMessage)
        {
            return new DbQueryResult(DbQueryResultStatus.Conflict, errorMessage);
        }

        public static DbQueryResult Error(string errorMessage)
        {
            return new DbQueryResult(DbQueryResultStatus.Error, errorMessage);
        }

        public void EnsureSuccess()
        {
            if (this.Status != DbQueryResultStatus.Ok)
            {
                throw new DbQueryException(this.ErrorMessage);
            }
        }
    }

    public class DbQueryResult<T>
    {
        private DbQueryResult(DbQueryResultStatus status, T value, string errorMessage = null)
        {
            this.Status = status;
            this.Result = value;
            this.ErrorMessage = errorMessage;
        }

        public T Result { get; }

        public string ErrorMessage { get; }

        public DbQueryResultStatus Status { get; }

        public static DbQueryResult<T> Ok(T value)
        {
            return new DbQueryResult<T>(DbQueryResultStatus.Ok, value);
        }

        public static DbQueryResult<T> NotFound(string errorMessage)
        {
            return new DbQueryResult<T>(DbQueryResultStatus.NotFound, default(T), errorMessage);
        }

        public static DbQueryResult<T> Conflict(string errorMessage)
        {
            return new DbQueryResult<T>(DbQueryResultStatus.Conflict, default(T), errorMessage);
        }

        public static DbQueryResult<T> ConstraintViolation(string errorMessage)
        {
            return new DbQueryResult<T>(DbQueryResultStatus.ConstraintViolation, default(T), errorMessage);
        }

        public static DbQueryResult<T> Error(string errorMessage)
        {
            return new DbQueryResult<T>(DbQueryResultStatus.Error, default(T), errorMessage);
        }

        public void EnsureSuccess()
        {
            if (this.Status != DbQueryResultStatus.Ok)
            {
                throw new DbQueryException(this.ErrorMessage);
            }
        }
    }
}
