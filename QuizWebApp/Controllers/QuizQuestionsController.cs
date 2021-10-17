using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizWebApp.Models;

namespace QuizWebApp.Controllers
{
    public class FormattedQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public List<string> Options { get; set; }
        public int Correctanswer { get; set; }
    }

    public class FormattedQuestionNA
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public List<string> Options { get; set; }
    }


    [Route("api/[controller]")]
    [ApiController]
    public class QuizQuestionsController : ControllerBase
    {
        //AUTO GENERATED FROM CONTROLLER BASE (API CONTROLLER WITH EFCORE FUNCTIONALITY)
        private readonly samplequizContext _context;

        public QuizQuestionsController(samplequizContext context)
        {
            _context = context;
        }

        // GET: api/QuizQuestions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormattedQuestionNA>>> GetQuizQuestions()
        {
            List<FormattedQuestionNA> formattedQuestions = new List<FormattedQuestionNA>();
            foreach (var item in _context.QuizQuestions.ToList())
            {
                FormattedQuestionNA fq = new FormattedQuestionNA()
                {
                    Id = item.Id,
                    Question = item.Question,
                    Options = new List<string>(){item.Option0, item.Option1, item.Option2, item.Option3}
                };
                formattedQuestions.Add(fq);
            }
            
            return formattedQuestions;
        }

        [HttpGet("/api/answers/{id}")]
        public async Task<ActionResult<FormattedQuestion>> GetAnswer(int id)
        {
            var quizQuestion = await _context.QuizQuestions.FindAsync(id);
                FormattedQuestion fq = new FormattedQuestion()
                {
                    Id = quizQuestion.Id,
                    Question = quizQuestion.Question,
                    Options = new List<string>() { quizQuestion.Option0, quizQuestion.Option1, quizQuestion.Option2, quizQuestion.Option3 },
                    Correctanswer = quizQuestion.Correctanswer
                };


            return fq;
        }



        // GET: api/QuizQuestions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuizQuestion>> GetQuizQuestion(int id)
        {
            var quizQuestion = await _context.QuizQuestions.FindAsync(id);

            if (quizQuestion == null)
            {
                return NotFound();
            }

            return quizQuestion;
        }

        // PUT: api/QuizQuestions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuizQuestion(int id, QuizQuestion quizQuestion)
        {
            if (id != quizQuestion.Id)
            {
                return BadRequest();
            }

            _context.Entry(quizQuestion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizQuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/QuizQuestions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<QuizQuestion>> PostQuizQuestion(QuizQuestion quizQuestion)
        {
            _context.QuizQuestions.Add(quizQuestion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuizQuestion", new { id = quizQuestion.Id }, quizQuestion);
        }

        // DELETE: api/QuizQuestions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuizQuestion(int id)
        {
            var quizQuestion = await _context.QuizQuestions.FindAsync(id);
            if (quizQuestion == null)
            {
                return NotFound();
            }

            _context.QuizQuestions.Remove(quizQuestion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuizQuestionExists(int id)
        {
            return _context.QuizQuestions.Any(e => e.Id == id);
        }
    }
}
