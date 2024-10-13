require 'open-uri'
require 'uri'

site_url = "https://tisdag.fransman.se"

seasons = ["2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"]
events = [
 [433,434,435,468,469,470,503,504,505,506,507,508,509,510,511,512,513,514,515,516],
 [413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432],
 [392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412],
 [376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389],
 [358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371],
 [334, 335, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 350, 351],
 [205, 208, 211, 214, 222, 225, 226, 228, 229, 230, 231, 234, 235, 237, 240, 246, 247, 266],
 [130, 131, 132, 133, 140, 141, 142, 143, 145, 146, 147, 148, 149, 150, 151, 152, 157, 158],
 [1, 2, 5, 6, 9, 11, 15, 16, 18, 20, 30, 31, 43, 44, 45, 49, 51, 54]
]

seasons.each do |id, index|
  Dir.mkdir("./public/#{id}", 0700)

  #season index
  File.open("./public/#{id}/index.html","w") do |f|
    season_index_body = open("#{site_url}/#{id}", {ssl_verify_mode: 0}).read
    f << season_index_body
  end

  # event index
  events[index].each do |eid|
    Dir.mkdir("./public/#{id}/#{eid}", 0700)
    File.open("./public/#{id}/#{eid}/index.html","w") do |f|
      event_body = open("#{site_url}/#{id}/#{eid}", {ssl_verify_mode: 0}).read
    end
  end

  # Final leaderboard
  # 2020,2021,2022 = /scoring_sessions/final_2022/leaderboard
  if id == "2022" or id == "2021" or id == "2020"
    File.open("./public/#{id}/final.html","w") do |f|
      leaderboard_body = open("#{site_url}/scoring_sessions/final_#{id}/leaderboard", {ssl_verify_mode: 0}).read
      f << leaderboard_body
    end
  end

  # sorting...
  # No öl or kr 2015,2014...
  # /2022/513?sort=total_points (solved by event index!)
  # /2022/513?sort=beers
  # /2022/513?sort=total_kr
  if id != 2015 or id != 2014
    events[index].each do |eid|
      File.open("./public/#{id}/#{eid}/beers.html","w") do |f|
        beers_body = open("#{site_url}/#{id}/#{eid}?sort=beers", {ssl_verify_mode: 0}).read
        f << beers_body
      end
      File.open("./public/#{id}/#{eid}/kr.html","w") do |f|
        kr_body = open("#{site_url}/#{id}/#{eid}?sort=total_kr", {ssl_verify_mode: 0}).read
        f << kr_body
      end
    end
  end

  # Example for doing html scanning/replacing etc
  # player_index_body = open("https://2013.tisdagsgolfen.se/players/#{id}", {ssl_verify_mode: 0}).read
  # links = player_index_body.scan(/<a.+?href="\/players\/#{id}\/scorecards(.+?)"./)
  # links.each do |link|
  #   sid = link.first.to_s.gsub('/', '')
  #   File.open("./players/#{id}/scorecards/#{sid}.html","w") do |f|
  #     f << open("https://2013.tisdagsgolfen.se/players/#{id}/scorecards/#{sid}", {ssl_verify_mode: 0}).read
  #   end
  # end

end
