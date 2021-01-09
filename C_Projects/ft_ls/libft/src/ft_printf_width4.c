/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   width4.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/29 15:29:41 by blaine            #+#    #+#             */
/*   Updated: 2020/01/30 22:32:11 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_neg_front(t_stf *stf, int cnt, char **str)
{
	char *front;

	front = NULL;
	(stf->flags[2] == '-' || stf->pres != -1) ? stf->flags[3] = '\0' : 1;
	if (cnt > stf->pres && cnt > stf->width)
		return (NULL);
	else if (stf->pres >= cnt && stf->flags[2] == '-')
		ft_neg_sub1(stf, str, cnt, front);
	else if (stf->pres >= cnt && stf->flags[2] != '-')
		ft_neg_sub2(stf, str, cnt, front);
	else if (stf->pres < cnt && stf->width > cnt && stf->flags[2] != '-')
		ft_neg_sub3(stf, str, cnt);
	return (NULL);
}

char	*minus_zero_handle(t_stf *stf, long long num)
{
	char	*str;

	if (stf->width > 0 && num == 0 && stf->pres == 0 && stf->flags[2] == '-')
	{
		str = ft_strnew(stf->width);
		ft_memset(str, ' ', stf->width);
		return (str);
	}
	return (NULL);
}

char	*ft_end_str(t_stf *stf, long long num, int count)
{
	int		max;
	char	*end;

	if (stf->width > count && stf->width > stf->pres && stf->flags[2] == '-')
	{
		if (!(max = 0) && count > stf->pres && num != 0)
			max = stf->width - count;
		else if (stf->pres > count)
		{
			max = stf->width - stf->pres;
			if (num < 0)
				max -= 1;
		}
		(stf->flags[1] == '+' && num >= 0) ? max-- : 1;
		if (max > 0)
		{
			end = ft_strnew(max);
			ft_memset(end, ' ', max);
			return (end);
		}
	}
	return (minus_zero_handle(stf, num));
}
