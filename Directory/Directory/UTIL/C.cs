using System.Net;
using System.Runtime.Serialization;

namespace Directory.Utils
{
    public class C
    {
        #region Token Params
        public const string OK = "OK";
        public const string Issuer = Audience;
        public const string Audience = "https://localhost:44314/";
        public const string Secret = "Directory-@dm1n2022";
        public const string Data_Saved = "Your data was saved succesfull";
        #endregion

        #region Roles
        public const string CRUD = "admin";
        #endregion

        #region messages
        public const string Record_Not_Found = "Record not found";
        public const string Record_Already_Exist = "Record already exist in database";
        public const string Login_Fail = "Credentials fail: verify username or password";
        public const string LogginSuccess = "Loggin was succesfull";
        public const string LogginError = "Loggin error";
        public const string DBError = "Error to access to the DB";
        public const string DATA_REMOVED = "Your data was removed from set up";        
        public const string OPTION_NOT_FOUND = "option not found";
        public static string File_Exist = "File already exist in folder, please change name to upload please.";
        public static string DONT_HAVE_ROL = "You dont have access rol to save data, please contact the admin";
        #endregion

        #region Status Code
        public const WebExceptionStatus NOTFOUND = (WebExceptionStatus)404;
        public const WebExceptionStatus BADREQUEST = (WebExceptionStatus)400;
        public const WebExceptionStatus SERVERERROR = (WebExceptionStatus)500;
        public const WebExceptionStatus NOT_AUTH = (WebExceptionStatus)401;
        #endregion

        #region Modules
        public const string Contacts = "Contacts";
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

        #region audit trail type
        public const string MODULES = "modules";
        public const string TRANSACTION = "transaction";
        public const string CREATEDBY = "createdBy";
        #endregion

        #region Roles Type
        public static string ADMIN = "admin";
        public static string VIEWER = "viewer";
        #endregion
    }
}