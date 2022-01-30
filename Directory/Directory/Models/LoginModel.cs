using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Directory.Models
{
    public class LoginModel
    {
        public string ActiveDirectoryGroupName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int ProcessId { get; set; }
        public bool NtAccount { get; set; }
    }
}
