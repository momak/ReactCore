using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCore.Models;

namespace ReactCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
       // private readonly EmployeeRecordsContext _context;
        EmployeeDataAccessLayer objemployee = new EmployeeDataAccessLayer();

        [HttpGet]
        [Route("Index")]
        public IEnumerable<TblEmployee> Index()
        {
            return objemployee.GetAllEmployees();
        }
        [HttpPost]
        [Route("Create")]
        public int Create(TblEmployee employee)
        {
            return objemployee.AddEmployee(employee);
        }
        [HttpGet]
        [Route("Details/{id}")]
        public TblEmployee Details(int id)
        {
            return objemployee.GetEmployeeData(id);
        }
        [HttpPut]
        [Route("Edit")]
        public int Edit(TblEmployee employee)
        {
            return objemployee.UpdateEmployee(employee);
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public int Delete(int id)
        {
            return objemployee.DeleteEmployee(id);
        }
        [HttpGet]
        [Route("GetCityList")]
        public IEnumerable<TblCities> Details()
        {
            return objemployee.GetCities();
        }
    }
}