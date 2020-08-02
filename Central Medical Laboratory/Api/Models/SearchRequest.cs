using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Central_Medical_Laboratory.Api.Models
{
    public class SearchRequest
    {
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public string SelectedLetter { get; set; }
        public string SearchText { get; set; }
    }
}
