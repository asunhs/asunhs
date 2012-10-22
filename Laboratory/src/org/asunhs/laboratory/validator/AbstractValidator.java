package org.asunhs.laboratory.validator;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;


public class AbstractValidator {
	
	protected static int[] end = {31,28,31,30,31,30,31,31,30,31,30,31};
	
	protected static final String PATTERN_NUM                           = "[0-9]+|[0-9]+\\.[0-9]+";
	protected static final String PATTERN_ALPHAORNUM                    = "[0-9a-zA-Z]+";
	protected static final String PATTERN_ALPHAORNUMORSPACE             = "[0-9a-zA-Z ]+";
	protected static final String PATTERN_ALPHAORNUMORUNDERSCORE        = "[0-9a-zA-Z_]+";
	protected static final String PATTERN_ALPHAORNUMORSPACEORUNDERSCORE = "[0-9a-zA-Z_ ]+";
	protected static final String PATTERN_DBRULECHARACTERS              = "[a-zA-Z_][0-9a-zA-Z_]+";
	protected static final String PATTERN_TELNUM                        = "[0-9\\-\\(\\)]+";
	protected static final String PATTERN_URL                           = "[0-9a-zA-Z\\-\\.\\:\\?=/&_ ]+";
	protected static final String PATTERN_SSN                           = "[0-9]{6}-[0-9]{7}";
	protected static final String PATTERN_SSN1                          = "[0-9]{6}";
	protected static final String PATTERN_SSN2                          = "[0-9]{7}";

	
	public static final String TYPE_DATE      = "DATE"     ;
	public static final String TYPE_DATEP     = "DATEP"    ;
	public static final String TYPE_TIME      = "TIME"     ;
	public static final String TYPE_NUMB      = "NUMB"     ;
	public static final String TYPE_ECNO      = "ECNO"     ;
	public static final String TYPE_ESNO      = "ESNO"     ;
	public static final String TYPE_EUNO      = "EUNO"     ;
	public static final String TYPE_ESUNO     = "ESUNO"    ;
	public static final String TYPE_DBCH      = "DBCH"     ;
	public static final String TYPE_TELNO     = "TELNO"    ;
	public static final String TYPE_EVAL_BOTH = "EVAL_BOTH";
	public static final String TYPE_SSN1      = "SSN1"     ;
	public static final String TYPE_SSN2      = "SSN2"     ;
	public static final String TYPE_SSN       = "SSN"      ;
	public static final String TYPE_URL       = "URL"      ;
	
	public static final String REQUIRED  = "REQUIRED";
	public static final String INVALID   = "INVALID" ;
	
	
	/**
	 *  test result object
	 */
	protected static class ValidateResult {
		protected String type;
		protected boolean valid;
		
		public boolean isValid() {
			return valid;
		}

		protected ValidateResult(String type, boolean valid) {
			this.type = type;
			this.valid = valid;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}
		
		public static ValidateResult notValid(String type) {
			return new ValidateResult(type, false);
		}
		
		public static ValidateResult valid(String type) {
			return new ValidateResult(type, true);
		}
	}
	
	
	
	public static boolean validate(Object target, String types) {
		return validate(target, types, false);
	}
	
	public static boolean validate(Object target, String types, boolean required) {
		return doValidation(target, types, required).isValid();
	}
	
	
	
	
	
	
	protected static ValidateResult doValidation(Object target, String types, boolean required) {
		if (required) {
			if (target == null || target.toString().isEmpty()) {
				return ValidateResult.notValid(REQUIRED);
			}
		}
		
		return checkValidation(target, types);
	}
	
	
	protected static ValidateResult checkValidation(Object target, String types) {
		String strValue = String.valueOf(target).trim();
		
		if (TYPE_DATE.equals(types)) {
			if (target instanceof Date) {
				return ValidateResult.valid(types);
			}
			else if (!isValidDate(strValue)) {
				return ValidateResult.notValid(types);
			}
		}
		else if (TYPE_DATEP.equals(types)) {
			if (target instanceof Date) {
				if (getToday().compareTo((Date) target) > 0) {
					return ValidateResult.notValid(types);
				}
			}
			else if (!isValidDateP(strValue)) {
				return ValidateResult.notValid(types);
			}
		}
		else if (TYPE_TIME.equals(types) && !isValidTime(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_NUMB.equals(types) && !isNum(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_ECNO.equals(types) && !isAlphaOrNum(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_ESNO.equals(types) && !isAlphaOrNumOrSpace(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_EUNO.equals(types) && !isAlphaOrNumOrUnderscore(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_ESUNO.equals(types) && !isAlphaOrNumOrSpaceOrUnderscore(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_DBCH.equals(types) && !isDBRuleCharacters(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_TELNO.equals(types) && !isTelNum(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_EVAL_BOTH.equals(types) && !isAlphaOrNum(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_SSN1.equals(types) && !isSSN1(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_SSN2.equals(types) && !isSSN2(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_SSN.equals(types) && !isSSN(strValue)) {
			return ValidateResult.notValid(types);
		}
		else if (TYPE_URL.equals(types) && !isURL(strValue)) {
			return ValidateResult.notValid(types);
		}
		
		return ValidateResult.valid(types);
	}
	
	
	
	
	
	
	
	
	/**
	 *  internal method 
	 */
	protected static String delDateDelim(String value) {
		return value.replaceAll("-", "").replaceAll("/", "");
	}
	
	protected static String delTimeDelim(String value) {
		return value.replaceAll(":", "");
	}
	
	protected static Date getToday() {
		Calendar cal = Calendar.getInstance();
		return getDate(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH)+1, cal.get(Calendar.DATE), 0, 0, 0);
	}
	
	protected static Date getDate(int year, int month, int date) {
		return getDate(year, month, date, 0, 0, 0);
	}
	
	protected static Date getDate(int year, int month, int date, int hour, int minute, int second) {
		Calendar cal = Calendar.getInstance();
		cal.set(year, month-1, date, hour, minute, second);
		cal.set(Calendar.MILLISECOND, 0);
		return cal.getTime();
	}
	
	protected static Timestamp getTimestamp(int year, int month, int date) {
		return getTimestamp(year, month, date, 0, 0, 0);
	}
	
	protected static Timestamp getTimestamp(int year, int month, int date, int hour, int minute, int second) {
		Calendar cal = Calendar.getInstance();
		cal.set(year, month-1, date, hour, minute, second);
		cal.set(Calendar.MILLISECOND, 0);
		return new Timestamp(cal.getTimeInMillis());
	}
	
	
	
	

	
	
	/**
	 *  validation method
	 */
	public static boolean isNum(String value) {
		return value.matches(PATTERN_NUM);
	}
	
	public static boolean isAlphaOrNum(String value) {
		return value.matches(PATTERN_ALPHAORNUM);
	}
	
	public static boolean isAlphaOrNumOrSpace(String value) {
		return value.matches(PATTERN_ALPHAORNUMORSPACE);
	}
	
	public static boolean isAlphaOrNumOrUnderscore(String value) {
		return value.matches(PATTERN_ALPHAORNUMORUNDERSCORE);
	}
	
	public static boolean isAlphaOrNumOrSpaceOrUnderscore(String value) {
		return value.matches(PATTERN_ALPHAORNUMORSPACEORUNDERSCORE);
	}
	
	public static boolean isDBRuleCharacters(String value) {
		return value.matches(PATTERN_DBRULECHARACTERS);
	}
	
	public static boolean isTelNum(String value) {
		return value.matches(PATTERN_TELNUM);
	}
	
	public static boolean isURL(String value) {
		return value.matches(PATTERN_URL);
	}
	
	public static boolean isSSN(String value) {
		return value.matches(PATTERN_SSN);
	}
	
	public static boolean isSSN1(String value) {
		return value.matches(PATTERN_SSN1);
	}
	
	public static boolean isSSN2(String value) {
		return value.matches(PATTERN_SSN2);
	}
	
	public static boolean isValidDate(String value) {
		value = delDateDelim(value);
		
		if (!isNum(value) || value.length() < 8) {
			return false;
		}
		
		String year  = value.substring(0, 4);
		String month = value.substring(4, 6);
		String day   = value.substring(6, 8);
		
		if (Integer.parseInt(year, 10) >= 1800 && isValidMonth(month) && isValidDay(year, month, day)) {
			return true;
		}
		
		return false;
	}
	
	public static boolean isValidDateP(String value) {
		if (isValidDate(value)) {
			Calendar cal = Calendar.getInstance();
			StringBuffer sb = new StringBuffer();
			sb.append(cal.get(Calendar.YEAR)).append(cal.get(Calendar.MONTH) < 9 ? "0" : "").append(cal.get(Calendar.MONTH)+1).append(cal.get(Calendar.DATE));
			
			if (sb.toString().compareTo(delDateDelim(value)) > 0) {
				return false;
			}
			
			return true;
		}

		return false;
	}
	
	public static boolean isValidMonth(String mm) {
		int m = Integer.parseInt(mm, 10);
		
		return (m >= 1 && m <= 12);
	}
	
	public static boolean isValidDay(String yyyy, String mm, String dd) {
		int y = Integer.parseInt(yyyy, 10);
		int m = Integer.parseInt(mm, 10) - 1;
		int d = Integer.parseInt(dd, 10);
		
		if (m == 1 && ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0)) {
			return (d >= 1 && d <= 29);
		}
		
		return (d >= 1 && d <= end[m]);
		
	}
	
	public static boolean isValidTime(String value) {
		value = delTimeDelim(value);
		
		if (!isNum(value) || value.length() < 4) {
			return false;
		}
		
		int hour = Integer.parseInt(value.substring(0, 2));
		int min  = Integer.parseInt(value.substring(2, 4));
		int sec  = value.length() == 6 ? Integer.parseInt(value.substring(4, 6)) : 0;
		
		return (hour < 24 && min < 60 && sec < 60);
	}	
}
