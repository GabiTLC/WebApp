using System.ComponentModel.DataAnnotations;

namespace WebApp.Models;

public class Bug
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(150)]
    public string Summary { get; set; } = null!;

    [Required]
    public string Type { get; set; } = null!;
    [Required]
    public string Priority { get; set; } = null!;
    [Required]
    public string Severity { get; set; } = null!;

    [Required]
    public string ReproRate { get; set; } = null!;
    
    [Required]
    public string Platform { get; set; } = null!;

    [Required]
    [MaxLength(5000)]
    public string Status { get; set; } = null!;

    public string State { get; set; } = null!;

    [Required]
    [MaxLength(5000)]
    public string Description { get; set; } = null!;
    [Required]
    [MaxLength(5000)]
    public string StepsToRepo { get; set; } = null!;

    [Required]
    [MaxLength(5000)]
    public string ExpectedResult { get; set; } = null!;
    
    
}