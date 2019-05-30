# This seed file makes a bunch of calls to this D&D API:
# http://www.dnd5eapi.co/
#
# Current call count: 513
#
# Please allow up to 10 minutes for the seed file to run

# Delete and reset all seeded classes
# ClassSpell.destroy_all
# Proficiency.destroy_all
# AbilityScore.destroy_all
# Race.destroy_all
# Trait.destroy_all
# RaceTrait.destroy_all
# CharClass.destroy_all
# Subclass.destroy_all
# ClassProficiency.destroy_all
# Spell.destroy_all
ClassProficiencyChoice.destroy_all


# Proficiency.reset_pk_sequence
# AbilityScore.reset_pk_sequence
# Race.reset_pk_sequence
# Trait.reset_pk_sequence
# RaceTrait.reset_pk_sequence
# CharClass.reset_pk_sequence
# Subclass.reset_pk_sequence
# ClassProficiency.reset_pk_sequence
# Spell.reset_pk_sequence
# ClassSpell.reset_pk_sequence
ClassProficiencyChoice.reset_pk_sequence


# Define base URL
url = "http://www.dnd5eapi.co/api"

# # Seed Classes
# i = 0
# 12.times do
#   i += 1
#   data = JSON.parse(RestClient.get(url + "/classes/#{i}"))
#   CharClass.create(name: data['name'], hit_die: data['hit_die'], saving_throws: data['saving_throws'].map {|x| x['name']}.join(', '))
# end
#
# # Seed Subclasses
# j = 0
# 12.times do
#   j += 1
#   data = JSON.parse(RestClient.get(url + "/subclasses/#{j}"))
#   Subclass.create!(name: data['name'], char_class: CharClass.all.find {|x| x.name == data['class']['name']}, flavor: data['subclass_flavor'], desc: data['desc'][0])
# end
#
# # Seed Races
# k = 0
# 9.times do
#   k += 1
#   data = JSON.parse(RestClient.get(url + "/races/#{k}"))
#   Race.create!(name: data['name'], speed: data['speed'], ability_bonuses: data['ability_bonuses'], alignment: data['alignment'], age: data['age'], size: data['size'])
# end
#
# # Seed Proficiencies, Class-Proficiency, and Class-Choice join table
# l = 0
# 122.times do
#   l += 1
#   data = JSON.parse(RestClient.get(url + "/proficiencies/#{l}"))
#   proficiency = Proficiency.create(category: data['type'], name: data['name'])
#   data['classes'].each do |char_class|
#     ClassProficiency.create(char_class: CharClass.all.find {|x| x.name == char_class['name']}, proficiency: proficiency)
#   end
# end
#
# # Seed Traits and Race-Trait join table
# m = 0
# 27.times do
#   m += 1
#   data = JSON.parse(RestClient.get(url + "/traits/#{m}"))
#   trait = Trait.create(name: data['name'], desc: data['desc'][0])
#
#   data['races'].each do |race|
#     name = race['name'].split(' ').last
#     race = Race.all.find {|x| x.name == name}
#     RaceTrait.all.find {|x| x.race == race && x.trait == trait} ? nil :
#       RaceTrait.create(race: race, trait: trait)
#   end
# end
#
# # Seed Spells and Class/Subclass-Spell join table
# n = 0
# 319.times do
#   n += 1
#   data = JSON.parse(RestClient.get(url + "/spells/#{n}"))
#   spell = Spell.create(name: data['name'], desc: data['desc'][0], range: data['range'], components: data['components'].join(', '), duration: data['duration'], concentration: data['concentration'] == 'yes' ? true : false, casting_time: data['casting_time'], level: data['level'], school: data['school']['name'])
#
#   data['classes'].each do |char_class|
#     ClassSpell.create(char_class: CharClass.find {|x| x.name == char_class['name']}, spell: spell)
#   end
#
#   data['subclasses'].each do |subclass|
#     ClassSpell.create(subclass: Subclass.find {|x| x.name == subclass['name']}, spell: spell)
#   end
# end

# Seed class proficiency choices
p = 0
12.times do
  p += 1
  data = JSON.parse(RestClient.get(url + "/classes/#{p}"))
  data['proficiency_choices'].each do |class_prof_choice|
    class_prof_choice['from'].each do |proficiency|
      ClassProficiencyChoice.create(char_class: CharClass.all.find{|x| x.name == data['name']}, proficiency: Proficiency.all.find{|x| x.name == proficiency['name']}, proficiency_type: Proficiency.all.find{|x| x.name == proficiency['name']}.category, choices: class_prof_choice['choose'])
    end
  end
end


# # Seed Equipment
# o = 0
# 256.times do
#   o += 1
#   data = JSON.parse(RestClient.get(url + "/equipment/#{o}"))
#   Equipment.create(data)
# end



AbilityScore.destroy_all
Character.destroy_all
CharacterProficiencyChoice.destroy_all
Skill.destroy_all

AbilityScore.reset_pk_sequence
Character.reset_pk_sequence
CharacterProficiencyChoice.reset_pk_sequence
Skill.reset_pk_sequence

# create characters
q = 0
30.times do
  q += 1
  def loop
    # create character
    ability_score = AbilityScore.create(strength: rand(9)+8, dexterity: rand(9)+8, constitution: rand(9)+9, intelligence: rand(9)+8, wisdom: rand(9)+8, charisma: rand(9)+8)
    char_class = CharClass.all.sample
    new = Character.new(name: Faker::Games::WorldOfWarcraft.hero, level: rand(12)+3, bio: Faker::Books::Dune.quote, ability_score: ability_score, race: Race.all.sample, char_class: char_class, subclass: Subclass.all.find {|x| x.char_class == char_class}, campaign: rand(8)+1 == 1 ? nil : Campaign.all.length > 0 ? Campaign.all.sample : nil)
    if Character.all.map(&:name).include?(new.name) || Character.all.map(&:bio).include?(new.bio)
      return loop
    else
      new.save
    end

  end
  loop
end

# create character proficiencies
Character.all.each do |character|
  # choose character proficiencies
  proficiency_choice_types = character.char_class.class_proficiency_choices.map(&:proficiency_type).uniq
  array_of_proficiency_choices = proficiency_choice_types.map{|x| character.char_class.class_proficiency_choices.select{|y| y.proficiency_type == x}}
  array_of_proficiency_choices.each do |category|
    number_of_choices = category[0].choices
    until number_of_choices == 0
      joinModelOption = category.sample
      newProf = joinModelOption.proficiency
      CharacterProficiencyChoice.create(proficiency: newProf, character: character, proficiency_type: newProf.category)
      category.delete(joinModelOption)
      number_of_choices -= 1
    end
  end
end

# # create skills
# Character.all.each do |character|
#   byebug
# end
