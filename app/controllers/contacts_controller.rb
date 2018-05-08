class ContactsController < ApplicationController
        # before_action :authenticate_user!
      
        # def index
        #   @contacts = current_user.contacts
        #   render json: @contacts
        # end
        def retrieve
            @user = User.find(params[:userid])
            @contacts = @user.contacts
            render json: @contacts
        end 
      
        # def show
        #   @contact = contact.find(params[:id])
      
        #   render json: @contact
        # end
      
        # def create
        #   @user = current_user
        #   @contact = @user.contacts.build(contact_params)
      
        #   if @user.save
        #     render json: @contact, status: :created, location: @contact
        #   else
        #     render json: @contact.errors, status: :unprocessable_entity
        #   end
        # end
      
        # def update
        #   @contact = Contact.find(params[:id])
      
      
        #   if @contact.update(contact_params)
        #     render json: @contact
        #   else
        #     render json: @contact.errors, status: :unprocessable_entity
        #   end
        # end
      
        # def destroy
        #   @contact = Contact.find(params[:id]).delete
      
        #   render status: :ok
        # end
      
        private
      
        def contact_params
          params.require(:contact).permit(:userid, :name, :username, :image, :phone, :email, :twitter, :instagram, :facebook, :street, :city, :zip, :relation)
        end
end
