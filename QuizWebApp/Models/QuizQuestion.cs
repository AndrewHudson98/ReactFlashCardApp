using System;
using System.Collections.Generic;

#nullable disable

namespace QuizWebApp.Models
{
    public partial class QuizQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Option0 { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public int Correctanswer { get; set; }
    }
}
