using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Controllers;

public class BugsController : Controller
{
    private readonly AppDbContext _db;
    [BindProperty]
    public Bug Bugs { get; set; }
    
    public BugsController(AppDbContext db)
    {
        _db = db;
    }
    public IActionResult Index()
    {
        return View();
    }
    public IActionResult AddBug(int? id)
    {
        Bugs = new Bug();
        if (id == null)
        {
            //create
            return View(Bugs);
        }
        //update
        Bugs = _db.Bugs.FirstOrDefault(u => u.Id == id);
        if (Bugs == null)
        {
            return NotFound();
        }
        return View(Bugs);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddBug()
    {
        if (ModelState.IsValid)
        {
            if (Bugs.Id == 0)
            {
                _db.Bugs.Add(Bugs);
            }
            else
            {
                _db.Bugs.Update(Bugs);
            }
            _db.SaveChanges();
            return RedirectToAction("Index");
        }
        return View(Bugs);
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