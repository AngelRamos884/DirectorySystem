using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Directory.EFModels
{
    public class TelephoneNumbers : Base
    {
        public Contacts Contact { get; set; }
        public int ContactId { get; set; }
        public string TelephoneNumber { get; set; }
       
    }
}
