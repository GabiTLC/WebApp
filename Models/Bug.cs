using System.ComponentModel.DataAnnotations;

namespace WebApp.Models;

public class Bug
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Summary { get; set; }
    public string Type { get; set; } //dropdown
    [Required]
    public string Priority { get; set; }   //dropdown
    public char Severity { get; set; }   //dropdown
    public string Platform { get; set; }    //dropdown
    [Required]
    public string Description { get; set; } //areatext
    public string Attachment { get; set; }
    [Required]
    public string StepsToRepo { get; set; }     //areatext
    [Required]
    public string ExpectedResult { get; set; }  //area text
    
}