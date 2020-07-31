using System;
using System.Collections.Generic;

namespace Central_Medical_Laboratory.Models
{
    public partial class Test
    {
        public int Id { get; set; }
        public int? Code { get; set; }
        public string Name { get; set; }
        public int? CptCode { get; set; }
        public string PreferredRequirement { get; set; }
        public string AlternateRequirement { get; set; }
        public string MinimumVolume { get; set; }
        public string TransportTemp { get; set; }
        public string Tat { get; set; }
        public string Methodology { get; set; }
        public string DaysPerformed { get; set; }
        public string SpecialInstructions { get; set; }
        public string Comments { get; set; }
        public string TestIncluded { get; set; }
        public string PerformingLab { get; set; }
        public string ClinicalSignificance { get; set; }
    }
}
