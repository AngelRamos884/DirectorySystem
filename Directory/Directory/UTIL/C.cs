using System.Net;
using System.Runtime.Serialization;

namespace Directory.Utils
{
    public class C
    {
        #region Token Params
        public const string OK = "OK";
        public const string Issuer = Audience;
        public const string Audience = "https://localhost:44388/";
        public const string Secret = "JabilVisitas-@dm1n2021";
        public const string Data_Saved = "Your data was saved succesfull";
        #endregion

        #region Roles
        public const string CRUD = "admin";
        public const string CRU = "executor,admin,manager,production";
        public const string R = "admin,executor,manager";
        public const string ALL = "admin,executor,manager";
        #endregion

        #region messages
        public const string Record_Not_Found = "Record not found";
        public const string Record_Already_Exist = "Record already exist in database";
        public const string LogginSuccess = "Loggin was succesfull";
        public const string LogginError = "Loggin error";
        public const string DBError = "Error to access to the DB";
        public const string DATA_REMOVED = "Your data was removed from set up";
        public const string Date_Validation = "Intervalos de fecha fuera de rango, favor de verificar que la fecha inicial no sea mayor a la final.";
        public const string Date_Validation_Year = "Please, select a complete range of years.";
        public const string OPTION_NOT_FOUND = "option not found";
        public static string File_Exist = "File already exist in folder, please change name to upload please.";
        public static string AuditSchedules = "AuditSchedules";
        public static string Findings = "Findings";
        public static string DONT_HAVE_ROL = "You dont have access rol to save data, please contact the admin";
        public static string QUESTION_IS_USTED_ON_TEMPLATE = "This question is runnig on audit template configuration. If you need to add new question to template, please to create new one and set up other audit template.";
        #endregion

        #region Status Code
        public const WebExceptionStatus NOTFOUND = (WebExceptionStatus)404;
        public const WebExceptionStatus BADREQUEST = (WebExceptionStatus)400;
        public const WebExceptionStatus SERVERERROR = (WebExceptionStatus)500;
        #endregion

        #region Modules
        public const string Catalogs = "Catalogs";
        public const string Documents = "Documents";
        public const string Serials = "Serials";
        #endregion

        #region Code status for log
        public const int OKCode = 200;
        public const int NOTAUTH = 401;
        #endregion

        #region Transactions Msj
        public const string Login = "Login";
        public const string Insert = "Create";
        public const string Update = "Update";
        public const string Delete = "Delete";
        public const string Search = "Search";
        #endregion

        #region Recurrences Type
        public const int Daily = 1;
        public const int Weekly = 2;
        public const int Monthly = 3;
        public const int Quartly = 4;
        public const int Biannual = 5;
        public const int Annual = 6;
        #endregion

        #region audit trail type
        public const string MODULES = "modules";
        public const string TRANSACTION = "transaction";
        public const string CREATEDBY = "createdBy";
        #endregion

        #region Roles Type
        public static string EXECUTOR = "executor";
        public static string LEVELONE = "Level 1";
        public static string PRODUCTION = "production";
        #endregion
    }
}