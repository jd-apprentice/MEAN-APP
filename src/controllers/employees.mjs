import Employee from '../models/employees.mjs';

class EmployeeController {
  async getEmployees(req, res) {
    try {
      const employees = await Employee.find();
      return res.json(employees);
    } catch (error) {
      return res.status(401).send(error);    }
  }

  async getEmployee(req, res) {
    try {
      const employee = await Employee.findById(req.params.id);
      return res.json(employee);
    } catch (error) {
      return res.status(401).send(error);
    }
  }

  async updateEmployee(req, res) {
    const { id } = req.params;
    try {
      const updateEmployee = await Employee.findByIdAndUpdate(id, req.body);
      await updateEmployee.save();
      return res.json({ status: "Employee updated" });
    } catch (error) {
      return res.status(401).send(error);
    }
  }

  async deleteEmployee(req, res) {
    const { id } = req.params;
    try {
      await Employee.findByIdAndDelete(id);
      return res.json({ status: "Employee deleted successfully" });
    } catch (error) {
      return res.status(401).send(error);
    }
  }

  async createEmployee(req, res) {
    try {
      const newEmployee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        salary: req.body.salary,
      });
      await newEmployee.save();
      return res.json({ message: "Employee saved successfully" });
    } catch (error) {
      return res.status(401).send(error);
    }
  }
}

export default new EmployeeController();
