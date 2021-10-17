using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace QuizWebApp.Models
{
    public partial class samplequizContext : DbContext
    {
        public samplequizContext()
        {
        }

        public samplequizContext(DbContextOptions<samplequizContext> options)
            : base(options)
        {
        }

        public virtual DbSet<QuizQuestion> QuizQuestions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=sample-quiz;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<QuizQuestion>(entity =>
            {
                entity.ToTable("quiz_questions");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Correctanswer).HasColumnName("correctanswer");

                entity.Property(e => e.Option0)
                    .HasMaxLength(500)
                    .HasColumnName("option0");

                entity.Property(e => e.Option1)
                    .HasMaxLength(500)
                    .HasColumnName("option1");

                entity.Property(e => e.Option2)
                    .HasMaxLength(500)
                    .HasColumnName("option2");

                entity.Property(e => e.Option3)
                    .HasMaxLength(500)
                    .HasColumnName("option3");

                entity.Property(e => e.Question)
                    .HasMaxLength(500)
                    .HasColumnName("question");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
