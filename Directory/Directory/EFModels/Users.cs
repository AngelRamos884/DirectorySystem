using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Directory.EFModels
{
    public class Users : Base
    {
        public string Password { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
    }
}
