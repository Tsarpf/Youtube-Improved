using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YOUTUBEiMPROVED.Models;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Configuration;

namespace YOUTUBEiMPROVED.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/

		[HttpGet]
        public ActionResult Login()
        {
            return View(); //Return the normal view
        }

		[HttpPost]
		public ActionResult Login(LoginData login)
		{
            //TODO: Check if username&password are correct etc

			try
			{
				SqlConnectionStringBuilder csBuilder;
				csBuilder = new SqlConnectionStringBuilder(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
				csBuilder.IntegratedSecurity = false;

				SqlConnection connection = new SqlConnection(csBuilder.ToString());
				connection.Open();

				SqlDataReader reader = null;
				SqlCommand command = new SqlCommand("select * from \"User\"", connection);
				reader = command.ExecuteReader();

				while (reader.Read())
				{
					IDataRecord asd = (IDataRecord)reader;
					for (int i = 0; i < asd.FieldCount; i++)
					{
						login.loginMessage += asd[i] + " ";
					}
					login.loginMessage += "\n";
				}
			}
			catch (Exception e)
			{
				login.loginMessage = e.Message;
			}

            /*
			//Retrieve column schema into a DataTable.
			DataTable schemaTable = reader.GetSchemaTable();

			//For each field in the table...
			foreach (DataRow myField in schemaTable.Rows)
			{
				//For each property of the field...
				foreach (DataColumn myProperty in schemaTable.Columns)
				{
					//Display the field name and value.
					login.loginMessage += myProperty.ColumnName + " = " + myField[myProperty].ToString() + "\n";
				}
				login.loginMessage += "\n";

			}
            */

			connection.Close();


			login.correct = false;


			return View("Login", login);
		}

    }
}
