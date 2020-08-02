using Central_Medical_Laboratory.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Central_Medical_Laboratory.Api.Models
{
    public class SearchResult
    {
        public IEnumerable<Test> tests { get; set; }
        public int length { get; set; }
    }
}
