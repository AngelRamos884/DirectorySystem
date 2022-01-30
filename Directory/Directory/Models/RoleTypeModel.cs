using System;
using System.Collections.Generic;
using System.Text;

namespace Directory.Models
{
    public class RoleTypeModel
    {
        public int Id { get; set; }
        public string ActiveDirectoryGroupName { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
    }
}
