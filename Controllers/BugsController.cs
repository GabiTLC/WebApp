using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers;

public class Bugs : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}