require "test_helper"

class PortfolioControllerTest < ActionDispatch::IntegrationTest
  test "should get about_me" do
    get portfolio_about_me_url
    assert_response :success
  end

  test "should get projects" do
    get portfolio_projects_url
    assert_response :success
  end

  test "should get contact" do
    get portfolio_contact_url
    assert_response :success
  end
end
