class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :username
      t.string :image
      t.string :number
      t.string :email
      t.string :twitter
      t.string :instagram
      t.string :facebook
      t.string :street
      t.string :city
      t.string :zip
      t.string :relation
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
