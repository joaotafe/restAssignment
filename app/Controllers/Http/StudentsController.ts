import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import StudentValidator from 'App/Validators/StudentValidator'


export default class StudentsController {
  public async index({}: HttpContextContract) {
    const stud = await Student.all()
    return stud
  }

  public async store({request, response}: HttpContextContract) {

    try{
      const payload = await request.validate(StudentValidator) // validates the schema from StudentValidator
      const stud: Student = await Student.create(payload) // create schema
      return response.ok(stud)

    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async show({params, response}: HttpContextContract) {
    try{
    const stud = await Student.findOrFail(params.id)
    return response.ok(stud)
  }
  catch(ModelNotFoundException){

    return response.notFound({message: 'Student not found'})
  }}

  public async update({params, request, response}: HttpContextContract) {
    const id = params.id
    const stud = await Student.find(id)
    if(!stud){
      return response.notFound({message: 'Student not found!'})
    }
    if(request.method() === 'PATCH'){
      stud.GivenName = request.input('GivenName')
      stud.LastName = request.input('LastName')
      stud.EmailAddress = request.input('EmailAddress')

      await stud.save()
      return response.ok(stud)
    }
    if(request.method() === 'PUT'){
      const payload = await request.validate(StudentValidator)
      stud.merge(payload)
      await stud.save()           // The 'save()' method performs the INSERT query when persisting 
      return response.ok(stud)    // the model instance for the first time and performs the UPDATE query 
    }                            // when the model has persisted

  }

  public async destroy({params, response}: HttpContextContract) {
    const id = params.id
    const qual = await Student.find(id)

    if(!qual){
      return response.notFound({message: 'Qualification not found!'})
    }
    await qual.delete()

    return response.ok({
      message: `Qualification ${id + ': ' + qual.GivenName} was deleted successfully.`
    })
  }

}
