using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Controllers;

public class BugsController : Controller
{
    private readonly AppDbContext _db;

    public BugsController(AppDbContext db)
    {
        _db = db;
    }
        public IActionResult Index()
    {
        return View();
    }

    #region Api Calls
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Json(new { data = await _db.Bugs.ToListAsync() });
    }
    
    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var bugFromDb = await _db.Bugs.FirstOrDefaultAsync(u => u.Id == id);
        if (bugFromDb == null)
        {
            return Json(new { success = false, message = "Error while Deleting" });
        }
        _db.Bugs.Remove(bugFromDb);
        await _db.SaveChangesAsync();
        return Json(new { success = true, mesage = "Delete successful" });
    }
    #endregion
}