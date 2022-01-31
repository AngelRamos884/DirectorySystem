using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Directory.EFModels
{
    public class Contacts : Base
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        virtual public ICollection<TelephoneNumbers> TelephoneNumbers { get; set; }
        public Contacts()
        {
            this.TelephoneNumbers = new HashSet<TelephoneNumbers>();
        }
    }
}
